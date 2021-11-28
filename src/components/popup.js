import React from "react";

function Popup(props) {
  const customWidth = props.customWidth;
  const customMaxWidth = props.customMaxWidth;

  if (!props.isOpen) {
    return "";
  }
  return (
    <>
      <section className="mag__cart__popup">
        <section className="overly" onClick={() => props.onClose()}/>
        <section className="popupInner">
          <section className="innerElements">
            {props.hideClose ? null : (
              <span
                className="clos"
                onClick={() => {
                  props.onClose();
                }}
              />
            )}
            {props.children}
          </section>
        </section>
      </section>
      <style jsx>
        {`
          .mainpopup {
          }
          .overly {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 99999;
          }
          .popupInner {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            margin: 0 auto;
            z-index: 99999;
            width: auto;
          }
          .innerElements {
            background-color: #fff;
            margin: 0 auto;
            border-radius: 5px;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
            max-width: ${customMaxWidth ? customMaxWidth : "700px"};
            width: ${customWidth ? customWidth : "100%"};
            position: relative;
          }
          .clos {
            cursor: pointer;
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 999;
            width: 20px;
            height: 20px;
            transition: all 0.3s ease;
          }
          .clos:before {
            position: absolute;
            left: 10px;
            content: " ";
            width: 2px;
            background-color: #999;
            transform: rotate(45deg);
          }
          .clos:before {
            height: 20px;
            top: 0;
          }
          .clos:after {
            height: 20px;
            top: 0;
          }
          .clos:after {
            position: absolute;
            left: 10px;
            content: " ";
            width: 2px;
            background-color: #999;
            transform: rotate(-45deg);
          }
          .clos:hover {
            transform: rotate(90deg);
          }
          img {
            max-width: 100%;
            display: block;
          }
          @media (max-width: 767px) {
            .innerElements {
              max-width: 95%;
            }
          }
          @media (max-width: 1199px) {
            .popupInner {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}

export default Popup;
