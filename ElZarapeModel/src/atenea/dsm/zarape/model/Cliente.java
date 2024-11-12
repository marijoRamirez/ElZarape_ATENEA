/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package atenea.dsm.zarape.model;

/**
 *
 * @author HP
 */
public class Cliente {
    private int idCliente;
    private Persona persona;
    private int activo;

    public Cliente() {
    }

    public Cliente(int idCliente, Persona persona, int activo) {
        this.idCliente = idCliente;
        this.persona = persona;
        this.activo = activo;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Cliente {" +
                "idCliente=" + idCliente +
                ", persona=" + (persona != null ? persona.toString() : "null") +
                ", activo='" + activo + '\'' +
                '}';
    }
}
