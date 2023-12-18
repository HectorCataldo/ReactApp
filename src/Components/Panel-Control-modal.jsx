import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from 'react-router-dom';
import { CloseOutlined,SaveOutlined } from '@ant-design/icons';
import '../CSS/Panel-control-modal.scss';

const PanelControlModal = (props) => {
  const location = useLocation();
 
    const isModaltel = location.pathname === "/modaltel";
    const isModaldir = location.pathname === "/modaldir";
    const isModalcor = location.pathname === "/modalcor";

  const {handleSubmit} = props;
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="Panel-Control-modal">

        <>
          <Button className="btn_create" type="Submit" onClick={handleSubmit}><SaveOutlined className="create-log" /> Guardar </Button>
          <Button className="btn_cancel" onClick={handleGoBack}><CloseOutlined className="cancel-log"  /> Cancelar </Button>
        </>

    </div>
  );
};

export default PanelControlModal;
