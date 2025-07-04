/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Error message"
 *         message:
 *           type: string
 *           example: "Detailed error description"
 *         code:
 *           type: string
 *           example: "ERR-001"
 *       required:
 *         - error
 *
 *     BadRequestError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Bad Request Error"
 *         code:
 *           type: string
 *           example: "INT-001"
 *       required:
 *         - error
 *         - code
 *
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Authorization header is required"
 *         code:
 *           type: string
 *           example: "INT-002"
 *       required:
 *         - error
 *         - code
 *
 *     NotFoundError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Resource not found"
 *         code:
 *           type: string
 *           example: "INT-003"
 *       required:
 *         - error
 *         - code
 *
 *     InternalServerError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Internal Server Error"
 *       required:
 *         - error
 */
