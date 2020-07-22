import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }

  isEmpty(obj: any) {
    for(let key in obj) {
      if(obj.hasOwnProperty(key)) return false;
    }
      return true;
  }

  sendRequest(location: string, payload = {}) {
    let reqType: any;
    const headers = {
      headers: new HttpHeaders({})
    }
    if(!this.isEmpty(payload)) {
      reqType = this.http.post(location, payload, headers)
    } else {
      reqType = this.http.get(location);
    }
    return reqType;
  }
}