import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http';
//import { Storage } from '@ionic/storage';
import 'rxjs';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class FitproApi {

    // public baseUrl: string = 'http://www.fitpro.scotthummel.net/api/v1';
    // public baseUrl: string = 'http://fitpro.dev/api/v1';
    public baseUrl: string = '/api/v1';

    public headers;
    public options;

    constructor(private http: Http) {
        // storage.ready().then(() => {
        //     storage.get('token').then((token) => {
        //         this.headers = new Headers({
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + token
        //         });
        //         this.options = new RequestOptions({ headers: this.headers });
        //     })
        // })
    }

    // login(email, password): Observable<any> {
    //     let body = JSON.stringify({email : email, password : password});
    //
    //     return this.http.post(`${this.baseUrl}/authenticate`, body, this.options)
    //         .map((response: Response) => {
    //             let data = response.json();
    //
    //             // this.storage.ready().then(() => {
    //             //     this.storage.remove('token');
    //             //     this.storage.set('token', data.token);
    //             //     this.storage.set('user', JSON.stringify(data.user));
    //             // })
    //
    //             return response.json();
    //         });
    // }

    getExercises() : Observable<any> {
        return this.http.get(`${this.baseUrl}/exercises`, this.options)
            .map((response: Response) => {
                return response.json().data
            });
    }

    getExercisesByBodyPartId(bodyPartId) : Observable<any> {
        return this.http.get(`${this.baseUrl}/exercises?part_id=` + bodyPartId, this.options)
            .map((response: Response) => {
                return response.json().data
            });
    }

    getBodyParts() : Observable<any> {
        return this.http.get(`${this.baseUrl}/body-parts`, this.options)
            .map((response: Response) => {
                return response.json().data
            });
    }

    getExerciseCategories() : Observable<any> {
        return this.http.get(`${this.baseUrl}/exercise-categories`, this.options)
            .map((response: Response) => {
                return response.json().data
            });
    }

    getUsers() : Observable<any> {
        return this.http.get(`${this.baseUrl}/users`, this.options)
            .map((response: Response) => {
                return response.json().data
            });
    }

    assignWorkout(data) : Observable<any> {
        return this.http.post(`${this.baseUrl}/workouts`, {data : data}, this.options)
            .map((response: Response) => {
                //console.log(response.json())
                return response.json()
            });
    }
}
