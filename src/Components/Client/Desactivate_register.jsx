import React, { useEffect, useState } from "react";
import axios                          from "axios";
import Swal                           from "sweetalert2";

export const Desctivate = (props) => {
  const client = props.selectedClient || {}; // Use an empty object as a default value

  useEffect(() => {
    if (props.show) {
      Swal.fire({
        title: 'Warning',
        text: client.state
          ? "Esta seguro de desactivar este usuario?"
          : "Esta seguro de activar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: client.state ? 'Desactivar' : 'Activar'
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
      console.log("API Response: ", response.data);
      Swal.fire(
        'Activado!',
        'El usuario ha sido activado correctamente.',
        'success'
      );
      setTimeout(() => { window.location.reload(); }, 1000);
    } catch (error) {
      console.error("Error sending request to the API: ", error);
    }
  };

  const deactivateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/clients/state/${client.id}`
      );
      console.log("API Response: ", response.data);
      Swal.fire(
        'Desactivado!',
        'El usuario ha sido desactivado correctamente.',
        'success'
      );
      setTimeout(() => { window.location.reload(); }, 1000);
    } catch (error) {
      console.error("Error sending request to the API: ", error);
    }
  };

  return null;
};
