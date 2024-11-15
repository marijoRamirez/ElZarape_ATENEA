package atenea.dsm.zarape.model;

/**
 *
 * @author Emmanuel Ortiz Reyes
 */
public class Empleado {

    private int idEmpleado;
    private int idSucursal;
    private Persona persona;
    private Usuario usuario;
    private int activo;

    // Constructor vacío
    public Empleado() {
    }

    public Empleado(int idEmpleado, int idSucursal, Persona persona, Usuario usuario, int activo) {
        this.idEmpleado = idEmpleado;
        this.idSucursal = idSucursal;
        this.persona = persona;
        this.usuario = usuario;
        this.activo = activo;
    }

    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public int getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(int idSucursal) {
        this.idSucursal = idSucursal;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Empleado{" + "idEmpleado=" + idEmpleado + ", idSucursal=" + idSucursal + ", persona=" + persona + ", usuario=" + usuario + ", activo=" + activo + '}';
    }

}
