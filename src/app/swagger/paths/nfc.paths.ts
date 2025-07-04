/**
 * @swagger
 * /nfc/data:
 *   post:
 *     summary: Crear o actualizar datos NFC
 *     description: |
 *       Crea un nuevo NFC tag o actualiza uno existente según el nfcTagId proporcionado.
 *       - **Para CREAR**: Envía un UUID v4 nuevo
 *       - **Para ACTUALIZAR**: Envía el UUID de un NFC existente
 *       - El userId se obtiene automáticamente del token JWT
 *     tags:
 *       - NFC
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NfcDataRequest'
 *           examples:
 *             create_example:
 *               summary: Crear nuevo NFC
 *               value:
 *                 nfcTagId: "123e4567-e89b-12d3-a456-426614174000"
 *                 serialNumber: "NFC001234567890"
 *                 contactInfo:
 *                   - type: "tutor"
 *                     name: "María García"
 *                     phone: "+34612345678"
 *                     email: "maria.garcia@colegio.edu"
 *                     company: "Colegio San José"
 *                     position: "Tutora de 5º Primaria"
 *                   - type: "father"
 *                     name: "Carlos Pérez"
 *                     phone: "+34698765432"
 *                     email: "carlos.perez@gmail.com"
 *             update_example:
 *               summary: Actualizar NFC existente
 *               value:
 *                 nfcTagId: "456e7890-e89b-12d3-a456-426614174001"
 *                 serialNumber: "NFC987654321"
 *                 contactInfo:
 *                   - type: "mother"
 *                     name: "Ana López"
 *                     phone: "+34600123456"
 *                     email: "ana.lopez@gmail.com"
 *     responses:
 *       200:
 *         description: Datos NFC guardados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NfcDataResponse'
 *             examples:
 *               success:
 *                 summary: Operación exitosa
 *                 value:
 *                   message: "NFC data saved successfully"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *             examples:
 *               invalid_uuid:
 *                 summary: UUID inválido
 *                 value:
 *                   error: "Invalid UUID format"
 *                   code: "INT-002"
 *               invalid_data:
 *                 summary: Datos inválidos
 *                 value:
 *                   error: "Invalid NFC data"
 *                   code: "INT-002"
 *       401:
 *         description: Token de acceso inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *             examples:
 *               missing_token:
 *                 summary: Token faltante
 *                 value:
 *                   error: "Authorization header is required"
 *               invalid_token:
 *                 summary: Token inválido
 *                 value:
 *                   error: "Invalid or expired token"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 * /nfc/tag/{tagId}:
 *   get:
 *     summary: Obtener NFC tag por ID
 *     description: Obtiene los detalles completos de un NFC tag específico
 *     tags:
 *       - NFC
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tagId
 *         in: path
 *         required: true
 *         description: ID único del NFC tag (UUID v4)
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: NFC tag encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NfcTagResponse'
 *             examples:
 *               success:
 *                 summary: NFC tag encontrado
 *                 value:
 *                   data:
 *                     id: "123e4567-e89b-12d3-a456-426614174000"
 *                     userId: "123e4567-e89b-12d3-a456-426614174000"
 *                     serialNumber: "NFC001234567890"
 *                     nfcData:
 *                       contactInfo:
 *                         - type: "tutor"
 *                           name: "María García"
 *                           phone: "+34612345678"
 *                           email: "maria.garcia@colegio.edu"
 *                           company: "Colegio San José"
 *                           position: "Tutora de 5º Primaria"
 *                     isActive: true
 *                     createdAt: "2024-01-01T10:00:00.000Z"
 *                     updatedAt: "2024-01-01T15:30:00.000Z"
 *       401:
 *         description: Token de acceso inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: NFC tag no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *             examples:
 *               not_found:
 *                 summary: NFC no encontrado
 *                 value:
 *                   error: "NFC tag not found"
 *                   code: "NOT-001"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 * /nfc/tags/user:
 *   get:
 *     summary: Obtener NFC tags del usuario
 *     description: Obtiene un resumen de todos los NFC tags del usuario autenticado
 *     tags:
 *       - NFC
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de NFC tags del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NfcTagsResponse'
 *             examples:
 *               success:
 *                 summary: Lista de NFC tags
 *                 value:
 *                   nfcTags:
 *                     - id: "123e4567-e89b-12d3-a456-426614174000"
 *                       serialNumber: "NFC001234567890"
 *                     - id: "456e7890-e89b-12d3-a456-426614174001"
 *                       serialNumber: "NFC987654321"
 *               empty:
 *                 summary: Usuario sin NFC tags
 *                 value:
 *                   nfcTags: []
 *       401:
 *         description: Token de acceso inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 *
 * /nfc/public/{serialNumber}:
 *   get:
 *     summary: Obtener información pública del NFC
 *     description: |
 *       Obtiene la información de contacto pública de un NFC tag usando su número de serie.
 *       **No requiere autenticación** - Endpoint público para casos de emergencia.
 *     tags:
 *       - Public
 *     parameters:
 *       - name: serialNumber
 *         in: path
 *         required: true
 *         description: Número de serie del chip NFC
 *         schema:
 *           type: string
 *           example: "NFC001234567890"
 *     responses:
 *       200:
 *         description: Información pública del NFC encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PublicNfcResponse'
 *             examples:
 *               success:
 *                 summary: Información encontrada
 *                 value:
 *                   serialNumber: "NFC001234567890"
 *                   contactInfo:
 *                     - type: "tutor"
 *                       name: "María García"
 *                       phone: "+34612345678"
 *                       email: "maria.garcia@colegio.edu"
 *                       company: "Colegio San José"
 *                       position: "Tutora de 5º Primaria"
 *                     - type: "father"
 *                       name: "Carlos Pérez"
 *                       phone: "+34698765432"
 *                       email: "carlos.perez@gmail.com"
 *       404:
 *         description: NFC tag no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *             examples:
 *               not_found:
 *                 summary: NFC no encontrado
 *                 value:
 *                   error: "NFC tag not found"
 *                   code: "NOT-001"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalServerError'
 */
