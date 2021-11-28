import React from 'react';

const Spinner = (props) => {
  return (

    <aside id="preloader">
      <div className="loader">
        <div className="load-3">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      </div>
      <style jsx>
          {
              `
              .loader {
                position: fixed;
                left: 0;
                top: 0;
                z-index: 2000;
                bottom: 0;
                right: 0;
            }
            .load-3{
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .line {
               display: inline-block;
               width: 15px;
               height: 15px;
               border-radius: 15px;
               background-color: #4b9cdb;
                   margin: 0 5px;
            }
            .load-3 .line:nth-last-child(1) {animation: loadingC .6s .1s linear infinite;}
            .load-3 .line:nth-last-child(2) {animation: loadingC .6s .2s linear infinite;}
            .load-3 .line:nth-last-child(3) {animation: loadingC .6s .3s linear infinite;}
            @keyframes loadingC {
                0 {transform: translate(0,0);}
                50% {transform: translate(0,15px);}
                100% {transform: translate(0,0);}
            }
              `
          }
      </style>
    </aside>
  );
};

export default Spinner;