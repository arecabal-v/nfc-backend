/**
 * @swagger
 * components:
 *   schemas:
 *     ContactInfo:
 *       type: object
 *       required:
 *         - type
 *         - name
 *       properties:
 *         type:
 *           type: string
 *           enum: [tutor, father, mother, other]
 *           example: "tutor"
 *           description: "Tipo de contacto"
 *         name:
 *           type: string
 *           example: "María García"
 *           description: "Nombre del contacto"
 *         phone:
 *           type: string
 *           example: "+34612345678"
 *           description: "Teléfono del contacto"
 *         email:
 *           type: string
 *           format: email
 *           example: "maria.garcia@colegio.edu"
 *           description: "Email del contacto"
 *         company:
 *           type: string
 *           example: "Colegio San José"
 *           description: "Empresa o institución"
 *         position:
 *           type: string
 *           example: "Tutora de 5º Primaria"
 *           description: "Cargo o posición"
 *
 *     NfcDataRequest:
 *       type: object
 *       required:
 *         - nfcTagId
 *         - serialNumber
 *         - contactInfo
 *       properties:
 *         nfcTagId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *           description: "UUID v4 del NFC tag. Para CREAR: usar UUID nuevo. Para ACTUALIZAR: usar UUID existente."
 *         serialNumber:
 *           type: string
 *           example: "NFC001234567890"
 *           description: "Número de serie único del chip NFC"
 *         contactInfo:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContactInfo'
 *           description: "Lista de contactos asociados al NFC"
 *           minItems: 1
 *
 *     NfcDataResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "NFC data saved successfully"
 *       required:
 *         - message
 *
 *     NfcTag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         userId:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         serialNumber:
 *           type: string
 *           example: "NFC001234567890"
 *         nfcData:
 *           type: object
 *           properties:
 *             contactInfo:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactInfo'
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T15:30:00.000Z"
 *       required:
 *         - id
 *         - userId
 *         - serialNumber
 *         - nfcData
 *         - isActive
 *
 *     NfcTagResponse:
 *       type: object
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/NfcTag'
 *       required:
 *         - data
 *
 *     NfcTagSummary:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         serialNumber:
 *           type: string
 *           example: "NFC001234567890"
 *       required:
 *         - id
 *         - serialNumber
 *
 *     NfcTagsResponse:
 *       type: object
 *       properties:
 *         nfcTags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NfcTagSummary'
 *       required:
 *         - nfcTags
 *
 *     PublicNfcResponse:
 *       type: object
 *       properties:
 *         serialNumber:
 *           type: string
 *           example: "NFC001234567890"
 *         contactInfo:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ContactInfo'
 *       required:
 *         - serialNumber
 *         - contactInfo
 */
