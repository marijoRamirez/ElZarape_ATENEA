package atenea.dsm.zarape.model;


public class Sucursal {
    private int IdSucursal;
    private String NombreSucursal;
    private String LatitudSucursal;
    private String LongitudSucursal;
    private String HorariosSucursal;
    private String urlWebSucursal;
    private Long fotoSucursal;
    private String calleSucursal;
    private String numCalleSucursal;
    private String coloniaSucursal;
    private int idCiudad;
    private boolean estatusSucursal;
    
    public Sucursal() {
    }

    public Sucursal(int IdSucursal, String NombreSucursal, String LatitudSucursal, String LongitudSucursal, String HorariosSucursal, String urlWebSucursal, Long fotoSucursal, String calleSucursal, String numCalleSucursal, String coloniaSucursal, int idCiudad, boolean estatusSucursal) {
        this.IdSucursal = IdSucursal;
        this.NombreSucursal = NombreSucursal;
        this.LatitudSucursal = LatitudSucursal;
        this.LongitudSucursal = LongitudSucursal;
        this.HorariosSucursal = HorariosSucursal;
        this.urlWebSucursal = urlWebSucursal;
        this.fotoSucursal = fotoSucursal;
        this.calleSucursal = calleSucursal;
        this.numCalleSucursal = numCalleSucursal;
        this.coloniaSucursal = coloniaSucursal;
        this.idCiudad = idCiudad;
        this.estatusSucursal = estatusSucursal;
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

    public String getHorariosSucursal() {
        return HorariosSucursal;
    }

    public void setHorariosSucursal(String HorariosSucursal) {
        this.HorariosSucursal = HorariosSucursal;
    }

    public String getUrlWebSucursal() {
        return urlWebSucursal;
    }

    public void setUrlWebSucursal(String urlWebSucursal) {
        this.urlWebSucursal = urlWebSucursal;
    }

    public Long getFotoSucursal() {
        return fotoSucursal;
    }

    public void setFotoSucursal(Long fotoSucursal) {
        this.fotoSucursal = fotoSucursal;
    }

    public String getCalleSucursal() {
        return calleSucursal;
    }

    public void setCalleSucursal(String calleSucursal) {
        this.calleSucursal = calleSucursal;
    }

    public String getNumCalleSucursal() {
        return numCalleSucursal;
    }

    public void setNumCalleSucursal(String numCalleSucursal) {
        this.numCalleSucursal = numCalleSucursal;
    }

    public String getColoniaSucursal() {
        return coloniaSucursal;
    }

    public void setColoniaSucursal(String coloniaSucursal) {
        this.coloniaSucursal = coloniaSucursal;
    }

    public int getIdCiudad() {
        return idCiudad;
    }

    public void setIdCiudad(int idCiudad) {
        this.idCiudad = idCiudad;
    }

    public boolean isEstatusSucursal() {
        return estatusSucursal;
    }

    public void setEstatusSucursal(boolean estatusSucursal) {
        this.estatusSucursal = estatusSucursal;
    }
    
    
    
    
}
