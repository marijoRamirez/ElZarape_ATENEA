/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package atenea.dsm.zarape.model;

/**
 *
 * @author DIEGO
 */
public class Producto {

    private int idProducto;
    private String nombre;
    private String descripcion;
    private String foto;
    private double precio;
    private Categoria Categoria;
    private int activo;

    // Constructor vacío
    public Producto() {
    }

    public Producto(int idProducto, String nombre, String descripcion, String foto, double precio, Categoria Categoria, int activo) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        this.precio = precio;
        this.Categoria = Categoria;
        this.activo = activo;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCategoria() {
        return categoria;
    }

    public void setIdCategoria(Categoria categoria) {
        this.Categoria = Categoria;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

}
