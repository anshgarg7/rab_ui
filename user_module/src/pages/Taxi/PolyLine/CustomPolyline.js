import React from "react";
import { compose, withProps } from "recompose";
// import decodePolyline from "decode-google-map-polyline";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow
} from "react-google-maps";
// import loc from "./assets/loc.svg";
import loc from "./assets/loc.svg";
import { red } from "@mui/material/colors";
let pos = []
let form = {}
// { lat: 19.076090, lng: 72.877426 },
//   // { lat: -31.89843, lng: 115.89793 },
//   // { lat: -31.89852, lng: 115.8978 }, 
// ]


// const encodedPolyline =
//   "ejeiHkejMiAvGWxA|Ap@VLh@qBvAoFx@wCrAiFZm@tEwO~FyTjByH`@{@`@g@h@o@d@O~IGp@STSnBiD|B{D|DqGdA_AzBoBnDcE|E{Hn@mBT{ARo@x@oAfA_B@C~@yAxE{GjJeL~GcI~DaFlAgAjBoBfDsEf@s@xAsBz@{A`AkBvIqLbL{OtCqDzBsBhEwDpA}BjCoFb@cAh@kAtA_CjEcEjAqAf@_A`BgC~GaLrDsH|BmGnAiEzDeQtEuYjFu^j@kFh@}K@eHSyLD}Nn@sNJ{JOmUc@wd@?aRFcEz@wVzBqn@CiEGqAc@kD[uAy@eCqDyI{FkNoCwGeCiFmAqBgAqAk@g@oA{@_Bm@}Eu@yBg@sAm@wBkBaAuA_BoDaAcD_BcHaBkJcBgOqDwe@UmE?QWyDmBk[w@eQ_@mG[cBe@kBaAeCe@}@cBuBcAu@yCqAkBg@iFuBaFeC{Bk@yBUaA@mBXsCXsBcD`AkCd@eBRkBTwBPiABwAOeCSsBCcDb@cC|@wE|AqJxBwWtGcK|BkL|AcDv@sAr@cAr@u@v@wGhJoHrKeCfC{Az@_AZaCb@iFhBuEfBuB`@eCB}ASgCs@uDmAcCg@oC?wBb@kB`AoG~G{CrC}BnAuFhCuEjCaQzJkGhDaC~AkClEg@z@wClF_ArAkAz@}@TkAAqAi@yA}AwAwB_AqAkAiAk@c@sAw@oBk@aCKoANa@FGIc@NwDjAeAToDj@cBXe@^cCn@eC`AuC|AoFxD}DlCcB~@qBz@_Cl@kBT{BHaDOoCe@qDqAmIwDsBq@mIyBaJkC_CcA}AaAcK{H_BkAsFmDmFgC}EeBaImBeNkCoJeCiPmFcGcBcDq@eFo@cDOkEEeDHqMz@gHf@sTdBiIfAqFhA{LnDcEvAaMhEuPvF{MvEsF~AmHdBuIrAsFf@qJb@yG?iKc@gD_@mDm@wEwAyDkBoDmCsD{D{DuFwO{W{h@k~@mDeGiF}J_HyLcDcGqC{FqDiJg@qAA]ACgBoFaBiE{A_DmDoFwBgCeC}BQA{E{D_OwLmHkHkDcE_AaB_BaEgBgDuA_B{HqHu@q@EOEOyAwBiBkE}BcJ}AsF}B{FqCcF}D{EmCmB}B}@}BK_ADoBj@qHbD}DlBe@Co@L_A@gAMaBu@c@a@[m@u@eDyAoMGgEV_GdAoHh@wCr@cC`BqDbAgDqEKcGqAep@UiJImDOmAK]a@o@q@Wk@AyAVkCr@SVy@bAM^UlBAjB";
// const decodedPolyline = decodePolyline(encodedPolyline);
// console.log({ decodedPolyline });
const CustomMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDk_8w619G2LteJdDgBARkj0sNR4jMFhPc&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap

    defaultZoom={14}
    defaultCenter={pos[pos.length - 1]}
    ref={props.onMapMounted}
  >
    <Polyline
      path={pos}
      geodesic={true}
      options={{
        strokeColor: "#00000",
        strokeWeight: 3,
        icons: [
          {
            offset: "0",
            repeat: "20px"
          }
        ]
      }}
    />
    <Marker
      position={pos[pos.length - 1]}
      icon={{
        url: loc,
        scale: 2
      }}
    >
      <InfoWindow  >
        <p className="text-white text-center"><span className="text-warning">Drop Loaction </span><br/>{form.dropLoaction}</p>
      </InfoWindow>
    </Marker>
    <Marker
      position={pos[0]}
      icon={{
        url: loc,
        color: "#e00748",
        scale: 2
      }}

    //  labelStyle={{backgroundColor:"red",color:"red"}}
    >
      <InfoWindow >
        <p className="text-white text-center"><span className="text-danger">Pick Up Loaction </span><br/>{form.pickLocation}</p>
      </InfoWindow>
    </Marker>

  </GoogleMap >
));

class MapPolyline extends React.Component {
  handleMapMounted = (map) => {
    const { path } = this.props;

    this._map = map;
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();

      pos.map((position) => {
        bounds.extend(position);
      });

      this._map.fitBounds(bounds);
    }
  };
  render() {
    pos = this.props.pos
    form = this.props.form
    console.log(pos, "lllllllllllllllllllllllllllllll")
    return <CustomMapComponent onMapMounted={this.handleMapMounted} />;
  }
}

export default MapPolyline;
