import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MailService {
  private emailApiUrl = 'http://localhost:8080/sendemail';

  constructor(private httpclient: HttpClient) {}

  sendEmail(email: { to: string, subject: string, message: string }): Observable<void> {
    return this.httpclient.post<void>(this.emailApiUrl, email);
  }
} 