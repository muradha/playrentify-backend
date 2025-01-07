import { Module } from '@nestjs/common';
import { HttpResponseProvider } from 'src/common/http-response.provider';

@Module({
  providers: [HttpResponseProvider], // Daftarkan HttpResponseProvider
  exports: [HttpResponseProvider], // Ekspor agar bisa digunakan di modul lain
})
export class CoreModule {}

export { HttpResponseProvider };
