"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    validate(params) {
        const schema = this.schema();
        const { error, value } = schema.validate(params);
        if (error) {
            throw new Error(`Validation failed: ${error.details.map((detail) => detail.message).join(', ')}`);
        }
        return value;
    }
}
exports.default = Base;
