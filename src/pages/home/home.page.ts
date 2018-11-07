import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { WordpressListPage } from '../wordpress/list/wordpress.list.page';
import { SlideBoxPage } from '../slide-box/slide-box.page';
import { GoogleMapsPage } from '../google-maps/google-maps.page';

import { Tile } from './models/tile.model';
import { InAppBrowserService } from '../../services/in-app-browser.service';
import { data } from './home-data';
import { AuthService } from '../../services/auth.service';

import { LINHASPage } from '../linhas/linhas';
import { LINHASELECPage } from '../linha-selec/linha-selec';
import { snapshotToArray } from '../linhas/linhas';

import * as firebase from 'Firebase';

@Component({
	templateUrl: 'home.html',
	providers: []
})
export class HomePage {
	public tiles: Tile[][];

  private nav: Nav;

  favoritos = [];
  ref = firebase.database().ref('favoritos/');

	constructor(nav: Nav, private auth: AuthService) {
    this.nav = nav;
    this.ref.orderByChild('uid').equalTo(this.auth.getUID()).on('value', resp => {
      this.favoritos = [];
      this.favoritos = snapshotToArray(resp);
    });
	}

	public navigateTo(tile) {
		this.nav.setRoot(tile.component);
  }

  goToLINHAS(params) {
    if (!params) {
      params = {};
    }
    this.nav.push(LINHASPage);
  }

  goToLinhaSelec(cdLinha) {
    let linhas = [];
    const linhasRef = firebase.database().ref('linhas/');
    linhasRef.orderByChild('cd_linha').equalTo(cdLinha).on('value', resp => {
      linhas = [];
      linhas = snapshotToArray(resp);

      const params = {
        linha: linhas[0]
      };
      this.nav.push(LINHASELECPage, params);
    });
  }
}
