/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package atenea.dsm.zarape.model;

/**
 *
 * @author HP
 */
public class Bebida {

    private int idBebida;
    private Producto producto;

    public Bebida() {
    }

    public Bebida(int idBebida, Producto producto) {
        this.idBebida = idBebida;
        this.producto = producto;
    }

    public int getIdBebida() {
        return idBebida;
    }

    public void setIdBebida(int idBebida) {
        this.idBebida = idBebida;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    @Override
    public String toString() {
        return "Bebida{" + "idBebida=" + idBebida + ", producto=" + producto + '}';
    }

    
}
