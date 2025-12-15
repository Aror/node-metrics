const { GoogleGenerativeAI } = require("@google/generative-ai");
const github = require("@actions/github");
const core = require("@actions/core");

async function updateStatus({ octokit, context, sha, state, description }) {
  if (!sha) {
    console.log("No PR_HEAD_SHA found, skipping status check update.");
    return;
  }
  const { owner, repo } = context.repo;
  try {
    await octokit.rest.repos.createCommitStatus({
      owner,
      repo,
      sha,
      state,
      description,
      context: "AI Review",
    });
  } catch (e) {
    console.error("Failed to update status check:", e);
  }
}

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!apiKey) {
    core.setFailed("GEMINI_API_KEY is not set");
    return;
  }
  core.setSecret(apiKey);

  if (!githubToken) {
    core.setFailed("GITHUB_TOKEN is not set");
    return;
  }
  core.setSecret(githubToken);

  const octokit = github.getOctokit(githubToken);
  const context = github.context;

  // Get the Pull Request Number
  const prNumber = process.env.PR_NUMBER;

  // Get the SHA for status check
  const prHeadSha = process.env.PR_HEAD_SHA;

  if (!prNumber) {
    core.setFailed("No pull request found in context or PR_NUMBER env var");
    return;
  }

  const { owner, repo } = context.repo;

  try {
    await updateStatus({
      octokit,
      context,
      sha: prHeadSha,
      state: "pending",
      description: "AI Review in progress..."
    });

    // Fetch the PR Diff
    const { data: diff } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
      mediaType: {
        format: "diff",
      },
    });

    if (!diff) {
      console.log("No diff found.");
      return;
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `
You are an expert code reviewer. Please review the following code changes from a Pull Request.
Focus on:
1. Potential bugs and errors.
2. High risk issues (correctness, security, data loss).
3. Code quality and best practices.
4. Performance improvements.

Provide your feedback in a clear, concise, and constructive manner.
If the code looks good, just say "LGTM!".

Here is the diff:
\`\`\`diff
${diff.substring(0, 30000)}
\`\`\`
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reviewComment = response.text();

    // Post the review as a comment
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `## Gemini AI Code Review\n\n${reviewComment}`,
    });

    console.log("Review posted successfully.");
    await updateStatus({
      octokit,
      context,
      sha: prHeadSha,
      state: "success",
      description: "AI Review complete"
    });

  } catch (error) {
    // Only attempt status update if octokit is initialized
    if (octokit) {
      await updateStatus({
        octokit,
        context,
        sha: prHeadSha,
        state: "error",
        description: "AI Review failed"
      });
    }
    core.setFailed(error.message);
  }
}

run();
