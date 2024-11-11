package atenea.dsm.zarape.model;

public class Sucursal {

    private int IdSucursal;
    private String NombreSucursal;
    private String UbicacionSucursal;
    private String LatitudSucursal;
    private String LongitudSucursal;
    private String HoraInicioSucursal;
    private String urlFoto;
    private boolean Estatus;

    public Sucursal() {
    }

    public Sucursal(int IdSucursal, String NombreSucursal, String UbicacionSucursal, String LatitudSucursal, String LongitudSucursal, String HoraInicioSucursal, String urlFoto, boolean Estatus) {
        this.IdSucursal = IdSucursal;
        this.NombreSucursal = NombreSucursal;
        this.UbicacionSucursal = UbicacionSucursal;
        this.LatitudSucursal = LatitudSucursal;
        this.LongitudSucursal = LongitudSucursal;
        this.HoraInicioSucursal = HoraInicioSucursal;
        this.urlFoto = urlFoto;
        this.Estatus = Estatus;
    }

    public int getIdSucursal() {
        return IdSucursal;
    }

    public void setIdSucursal(int IdSucursal) {
        this.IdSucursal = IdSucursal;
    }

    public String getNombreSucursal() {
        return NombreSucursal;
    }

    public void setNombreSucursal(String NombreSucursal) {
        this.NombreSucursal = NombreSucursal;
    }

    public String getUbicacionSucursal() {
        return UbicacionSucursal;
    }

    public void setUbicacionSucursal(String UbicacionSucursal) {
        this.UbicacionSucursal = UbicacionSucursal;
    }

    public String getLatitudSucursal() {
        return LatitudSucursal;
    }

    public void setLatitudSucursal(String LatitudSucursal) {
        this.LatitudSucursal = LatitudSucursal;
    }

    public String getLongitudSucursal() {
        return LongitudSucursal;
    }

    public void setLongitudSucursal(String LongitudSucursal) {
        this.LongitudSucursal = LongitudSucursal;
    }

    public String getHoraInicioSucursal() {
        return HoraInicioSucursal;
    }

    public void setHoraInicioSucursal(String HoraInicioSucursal) {
        this.HoraInicioSucursal = HoraInicioSucursal;
    }

    public String getUrlFoto() {
        return urlFoto;
    }

    public void setUrlFoto(String urlFoto) {
        this.urlFoto = urlFoto;
    }

    public boolean isEstatus() {
        return Estatus;
    }

    public void setEstatus(boolean Estatus) {
        this.Estatus = Estatus;
    }

}
