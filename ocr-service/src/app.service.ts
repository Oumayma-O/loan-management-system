import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { DocumentDto } from './shared/loan-application-full.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async handleProcessFilesRequest(data: DocumentDto[]) {
    // Create an array to store the extracted texts
    const extractedTexts: string[] = [];

    // Loop through each document
    for (const document of data) {
      // Create a Tesseract.js worker
      const worker = await createWorker();

      try {
        // Initialize the worker
        await worker.load();

        // Recognize text from the document's buffer
        const {
          data: { text },
        } = await worker.recognize(document.data);

        // Log the extracted text to the console
        console.log(`Extracted text from ${document.fileName}: ${text}`);

        // Push the extracted text to the array
        extractedTexts.push(text);
      } catch (error) {
        console.error(`Error processing document ${document.fileName}:`, error);
      } finally {
        // Terminate the worker
        await worker.terminate();
      }
    }

    // Return the array of extracted texts
    return extractedTexts;
  }
}
