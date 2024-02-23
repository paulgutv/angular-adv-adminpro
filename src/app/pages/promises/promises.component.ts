import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: ``
})
export class PromisesComponent implements OnInit {

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    })
    // const promesa = new Promise((resolve, reject) => {
    //   if(false) {
    //     resolve('wiiii')
    //   } else {
    //     reject('algo salió mal')
    //   }
    // });

    // promesa
    // .then((mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch((error) => {
    //   console.log('error en mi promesa', error);
    // })
  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then(resp => resp.json())
      .then(body => resolve(body.data))
    })


  }





}
