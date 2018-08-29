import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

/*
  Generated class for the PhenoApi provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhenoApi {

  private data: any;
  private token: any;
  public API: any;

  constructor(public http: Http) {  
    this.http = http;
    this.data = null;
    this.token=null;

    //API Calls
    this.API={
      'getObservations':'[yourApiEndPoint]',
      'getObservationsFiltered':'[yourApiEndPoint]',
      'getAllObservations':'[yourApiEndPoint]',
      'getUsers':'[yourApiEndPoint]',
      'updateUser':'[yourApiEndPoint]',
      'login':'[yourApiEndPoint]',
      'logout':'[yourApiEndPoint]',
      'getUserDetails':'[yourApiEndPoint]',
      'getObservationDetails':'[yourApiEndPoint]',
      'postObservation':'[yourApiEndPoint]',
      'deleteObservation':'[yourApiEndPoint]',
      'getObservationComments':'[yourApiEndPoint]',
      'postComment':'[yourApiEndPoint]',
      'postLike':'[yourApiEndPoint]',
      'postBestExample':'[yourApiEndPoint]',
      'postValidation':'[yourApiEndPoint]',
      'deleteComment':'[yourApiEndPoint]',
      'getSpecies':'[yourApiEndPoint]',
      'postLog':'[yourApiEndPoint]',
      'getNotifications':'[yourApiEndPoint]',
      'markNotificationAsRead':'[yourApiEndPoint]',
      'markAllAsRead':'[yourApiEndPoint]',
      'postWatsonMessage':'[yourApiEndPoint]',
      'getStages':'[yourApiEndPoint]',
      'getSchools':'[yourApiEndPoint]',
      'resetPassword':'[yourApiEndPoint]',
    }
  }

  getObservations(filter,limit,school,user){
    
      return this.data=this.http.get(this.API.getObservations+"/filter/"+filter+"/school/"+school+"/user/"+user+"/limit/"+limit)
        .timeout(10000)
        .map(res => res.json());
    
      }

  getAllObservations(){
    return this.data=this.http.get(this.API.getAllObservations).map(res => res.json());
  }
    
      getObservationsByLikes(filter,limit){
    
        console.log("recibo likes "+filter+" - "+limit);
        return this.data=this.http.get(this.API.getObservations+"/filter/"+filter+"/limit/"+limit+"/likes")
        .map(res => res.json());
        
      }
    
    
      getObservationsByValidations(filter,limit){
    
        return this.data=this.http.get(this.API.getObservations+"/filter/"+filter+"/limit/"+limit+"/validations")
        .map(res => res.json());
    
      }
    
      getObservationsByComments(filter,limit){
    
        return this.data=this.http.get(this.API.getObservations+"/filter/"+filter+"/limit/"+limit+"/comments")
        .map(res => res.json());
    
      }
    
      postObservation(observation){
    
        return this.data=this.http.post(this.API.postObservation, JSON.stringify(observation))
        .map(res => res.json());
    
      }
    
      editObservation(observation,userid){
    
        return this.data=this.http.put(this.API.postObservation+"/"+parseInt(userid)+"/"+observation.id, JSON.stringify(observation))
        .map(res => res.json());
    
      }
    
      login(user){
    
        console.log(user);
    
        return this.data=this.http.post(this.API.login, JSON.stringify(user))
        .map(res => res.json());
    
      }
    
      logout(iduser,idtoken){
    
        let logoutUser:any;
        logoutUser.iduser=iduser;
        logoutUser.idtoken=idtoken;
    
        return this.data=this.http.post(this.API.logout, JSON.stringify(logoutUser))
        .map(res => res.json());
    
      }
    
      getUsers(){
    
        return this.data=this.http.get(this.API.getUsers)
        .map(res => res.json());
    
      }
    
      getUserDetails(id){
        return this.data=this.http.get(this.API.getUserDetails+id)
        .map(res => res.json());
      }
    
      updateUser(user){
    
        return this.data=this.http.put(this.API.updateUser, JSON.stringify(user))
        .map(res => res.json());
    
      }
      
      getObservationDetails(id,currentUser){
        return this.data=this.http.get(this.API.getObservationDetails+id+'/'+currentUser)
        .map(res => res.json());
      }
    
      deleteObservation(id,iduser){
        return this.data=this.http.delete(this.API.deleteObservation+id+'/'+iduser)
        .map(res => res.json());
      }
    
      getObservationComments(id){
        return this.data=this.http.get(this.API.getObservationComments+id)
        .map(res => res.json());
      }
    
      postComment(comment){
    
        return this.data=this.http.post(this.API.postComment, JSON.stringify(comment))
        .map(res => res.json());
    
      }
    
      deleteComment(id){
        return this.data=this.http.delete(this.API.deleteComment+id)
        .map(res => res.json());
      }
    
      postLike(like){
    
        return this.data=this.http.post(this.API.postLike, JSON.stringify(like))
        .map(res => res.json());
    
      }

      postBestExample(bestexample){
    
        return this.data=this.http.post(this.API.postBestExample, JSON.stringify(bestexample))
        .map(res => res.json());
    
      }
    
      postValidation(validation){
    
        return this.data=this.http.post(this.API.postValidation, JSON.stringify(validation))
        .map(res => res.json());
    
      }
    
      getSpecies(){
    
        return this.data=this.http.get(this.API.getSpecies)
        .map(res => res.json());
    
      }
    
      getSpecieDetails(id){
    
        return this.data=this.http.get(this.API.getSpecies+'/'+id)
        .map(res => res.json());
    
      }

      getStageDetails(specie, stage){
    
        return this.data=this.http.get(this.API.getStage+'/'+specie+'/'+stage)
        .map(res => res.json());
    
      }
    
      postLog(log){
    
        return this.data=this.http.post(this.API.postLog, JSON.stringify(log))
        .map(res => res.json());
    
      }
    
      getNotifications(iduser){
    
        return this.data=this.http.get(this.API.getNotifications+iduser)
        .map(res => res.json());
    
      }
    
      markNotificationAsRead(id){
    
        return this.data=this.http.put(this.API.markNotificationAsRead, JSON.stringify(id))
        .map(res => res.json());
    
      }
      
      markAllAsRead(iduser){
        
        let user = {iduser:iduser};
        
        console.log("vou");
    
        return this.data=this.http.put(this.API.markAllAsRead,JSON.stringify(user))
        .map(res => res.json());
    
      }
    
      sendWatsonMessage(message){
    
        console.log(JSON.stringify(message));
    
        return this.data=this.http.post(this.API.postWatsonMessage, JSON.stringify(message))
        .map(res => res.json());
    
      }
      
      getStages(){
    
        return this.data=this.http.get(this.API.getStages)
        .map(res => res.json());
    
      }
    
      getSchools(){ //get the list of schools
    
        return this.data=this.http.get(this.API.getSchools)
        .map(res => res.json());
    
      }
    
      checkConnection(){ //check connection status
    
        return this.data=this.http.get(this.API.getSchools)
        .map(res => res.json());
    
      }

      resetPassword(user){ //reset password for user

        let data={
          'email':'[yourApiEndPoint]',
        }
    
        return this.data=this.http.put(this.API.resetPassword, JSON.stringify(data))
        .map(res => res.json());
    
      }
    

}
