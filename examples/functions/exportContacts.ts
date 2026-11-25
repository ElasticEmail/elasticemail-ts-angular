/*
 * Export contacts
 * Starts an export of your contacts to a CSV file and prints the download link.
 * Other options: fileFormat Csv, Xml or Json; compressionFormat None or Zip;
 * a rule (e.g. "Status = Engaged") or a list of emails to export only some contacts.
 *
 * Required access level: Export
 *
 * Server-side only (Angular SSR or Node). The API key comes from ELASTICEMAIL_API_KEY
 * through the Configuration provider described in examples/README.md.
 */
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CompressionFormat, ContactsService, ExportFileFormats } from '@elasticemail/elasticemail-client-ts-angular';

export async function exportContacts(): Promise<void> {
  const contacts = inject(ContactsService);

  try {
    const exported = await firstValueFrom(
      contacts.contactsExportPost(
        ExportFileFormats.Csv, // fileFormat
        undefined, // rule
        undefined, // emails
        CompressionFormat.None, // compressionFormat
        'exported.csv', // fileName
      ),
    );
    console.log(exported);
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      console.error(`Elastic Email API error ${error.status}:`, error.error);
    } else {
      throw error;
    }
  }
}
