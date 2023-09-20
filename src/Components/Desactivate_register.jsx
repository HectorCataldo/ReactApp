import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Desctivate = (props) => {
  const client = props.selectedClient || {}; // Use an empty object as a default value

  useEffect(() => {
    if (props.show) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      const swalTitle = client.state ? "DESACTIVAR" : "ACTIVAR";
      const swalText = client.state
        ? "¿Está seguro que desea desactivar este usuario?"
        : "¿Deseas activar a este usuario?";

      swalWithBootstrapButtons.fire({
        title: swalTitle,
        text: swalText,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: client.state ? "Desactivar" : "Activar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          if (client.state) {
            deactivateUser();
          } else {
            activateUser();
          }
        }
      });
    }
  }, [props.show, client.state]);

  const activateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/clients/state/${client.id}`
      );
      console.log("Respuesta de la API: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la solicitud a la API: ", error);
    }
  };

  const deactivateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/clients/state/${client.id}`
      );
      console.log("Respuesta de la API: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error al enviar la solicitud a la API: ", error);
    }
  };

  return null; // This component doesn't render anything on the screen
};
