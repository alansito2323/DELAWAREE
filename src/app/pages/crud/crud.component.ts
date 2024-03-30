import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common'; // Importa NgFor
import { DataService } from '../data.service';
import { Item } from '../item.model';
import { Datos } from "../../models/datos.model";
import { DataServices } from "../../services/data.services";
import { FirestoreService } from "../../services/firestore.service";


@Component({
  selector: "app-crud",
  standalone: true,
  imports: [FormsModule, NgFor], // Añade NgFor aquí
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.css"],
})
export class CrudComponent {
  item: Item = {
    nombre: '',
    descripcion: '',
    precio: undefined
  };
  items: Item[] = [];
  editingItem?: Item;

  constructor(private dataService: DataService, private dataServices:DataServices, private firestore: FirestoreService) {}

  ngOnInit() {
    this.loadItems();

    // this.obtenerDatos().subscribe(misDatos =>{
    //   console.log(misDatos)

    //   // this.datos= Object.values(misDatos)
    //   // this.setDatos(this.datos)
    // })
  }
  datos:Datos[] = [
    //new Datos("Dato 1", "Dato de Ejemplo"),
    // new Datos("Dato 2", "Dato2 de Ejemplo")
  ]
  setDatos(misDatos:Datos[]){
    this.datos = misDatos;
  }
  obtenerDatos(){
    // return this.dataServices.cargarAlgo()
    return this.firestore.obtenerDocumentos()
  }
  loadItems(): void {
    this.dataService.getItems().subscribe(items => this.items = items);
  }

  onSubmit(): void {
    if (this.editingItem && this.editingItem.id !== undefined) {
      this.dataService.updateItem(this.editingItem.id, this.item).subscribe({
        next: () => {
          console.log('Ítem actualizado');
          this.resetForm();
          this.loadItems();
        },
        error: (error) => console.error('Error al actualizar el ítem:', error)
      });
    } else if (!this.editingItem) {
      this.dataService.createItem(this.item).subscribe({
        next: () => {
          console.log('Ítem creado');
          this.resetForm();
          this.loadItems();
        },
        error: (error) => console.error('Error al crear el ítem:', error)
      });
    } else {
      console.error('Error: intento de actualizar un ítem sin un id válido.');
    }
  }

  selectItemForEdit(item: Item): void {
    this.editingItem = item;
    this.item = { ...item };
  }

  onDeleteItem(id: number | undefined): void {
    if (id !== undefined) {
      this.dataService.deleteItem(id).subscribe(() => {
        console.log('Ítem eliminado');
        this.loadItems(); // Recargar los ítems
      }, error => {
        console.error('Error al eliminar el ítem:', error);
      });
    } else {
      console.error('Intento de eliminar un ítem sin un id válido.');
    }
  }
  

  resetForm(): void {
    this.item = { nombre: '', descripcion: '', precio: undefined };
    this.editingItem = undefined;
  }
}
