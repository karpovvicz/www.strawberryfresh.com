import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable default body parser for file uploads
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Parse form data
        const form = formidable({
            maxFileSize: 100 * 1024 * 1024, // 100MB limit
            allowEmptyFiles: false,
            filter: ({ mimetype }) => {
                // Allow images and videos
                return mimetype && (mimetype.includes('image') || mimetype.includes('video'));
            },
        });

        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve([fields, files]);
            });
        });

        const uploadedUrls = {};

        // Upload each file to Cloudinary
        for (const [fieldName, fileArray] of Object.entries(files)) {
            if (Array.isArray(fileArray) && fileArray.length > 0) {
                const file = fileArray[0];

                // Validate file type
                const allowedTypes = [
                    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
                    'video/mp4', 'video/mov', 'video/avi', 'video/webm'
                ];

                if (!allowedTypes.includes(file.mimetype)) {
                    return res.status(400).json({
                        error: `Invalid file type: ${file.mimetype}. Allowed types: ${allowedTypes.join(', ')}`
                    });
                }

                // Upload to Cloudinary
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: file.mimetype.startsWith('image/') ? 'image' : 'video',
                            folder: 'strawberryfresh',
                            transformation: file.mimetype.startsWith('image/') ? [
                                { width: 1200, height: 800, crop: 'limit' },
                                { quality: 'auto', fetch_format: 'auto' }
                            ] : [
                                { width: 1280, height: 720, crop: 'limit' },
                                { quality: 'auto', fetch_format: 'auto' }
                            ],
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );

                    // Create read stream and pipe to Cloudinary
                    const fs = require('fs');
                    const readStream = fs.createReadStream(file.filepath);
                    readStream.pipe(uploadStream);
                });

                uploadedUrls[fieldName] = {
                    url: result.secure_url,
                    public_id: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                    bytes: result.bytes,
                };
            }
        }

        res.status(200).json({
            success: true,
            urls: uploadedUrls,
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Upload failed',
            details: error.message
        });
    }
}
