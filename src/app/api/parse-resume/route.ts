import { NextRequest, NextResponse } from 'next/server';

// @ts-ignore
const mammoth = require('mammoth');

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = '';

        if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')
        ) {
            // Handle DOCX files
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else {
            return NextResponse.json({ error: 'Unsupported file format. PDFs are parsed client-side.' }, { status: 400 });
        }

        // Basic clean up
        text = text.replace(/\s+/g, ' ').trim();

        return NextResponse.json({ text });

    } catch (error) {
        console.error('Error parsing file:', error);
        return NextResponse.json({ error: 'Failed to parse resume file.' }, { status: 500 });
    }
}
