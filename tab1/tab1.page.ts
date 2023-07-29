import { Component } from '@angular/core';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {NgFor, CommonModule} from '@angular/common';
import { GroceriesServiceService } from '.././groceries-service.service';
import { InputDialogService } from '.././input-dialog.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, NgFor, CommonModule],
})
export class Tab1Page {
  
  title = "Grocery";

  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, public inputDialogService: InputDialogService) {}
  
  loadItems(){
    return this.dataService.getItems();
  }
  async removeItem(item: { name: string; }, index: number){
    console.log("Removing Item - ", item)
    const toast = await this.toastCtrl.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
  }

  async editItem(item: { name: string; quantity: number; }, index: number){
    console.log("Editing Item - ", item)
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
  
}


