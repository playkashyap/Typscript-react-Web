import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';

const apiService = (URL: any, Meathod: any, Body?: any) => {

    const apiResponse = ajax({
        url: `http://localhost:5000/${URL}`,
        method: Meathod,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',

        },
        body: Body
    }).pipe(
        map(response => {
            return response;
        }),
        catchError(error => {
            return of(error);
        })
    );
    return apiResponse;
}

export default apiService;