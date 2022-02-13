export const GlobalIcons = {
    EscapeIcon : () => <svg xmlns="http://www.w3.org/2000/svg" 
                width="16" height="16" fill="currentColor" className="bi bi-x-lg" 
                viewBox="0 0 16 16">
                <path fillRule="evenodd" 
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                <path fillRule="evenodd" 
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
              </svg>,    
    CircleCheckIcon : (width: number, height: number) => <svg xmlns="http://www.w3.org/2000/svg" 
                width={width} height={height}
                className="ionicon" viewBox="0 0 512 512">
                <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" 
                  fill="white" stroke="green" strokeMiterlimit="10" strokeWidth="32"/>
                <path fill="white" stroke="green" strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="32" d="M352 176L217.6 336 160 272"/>
              </svg>,
    CircleIcon: (width: number, height: number) => <svg xmlns="http://www.w3.org/2000/svg" 
                width={width} height={height} 
                className="ionicon" viewBox="0 0 512 512"
                >
                <circle cx="256" cy="256" r="192" 
                fill="none" stroke="#adb5bd" 
                strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="32"/>
              </svg>,
    BackIcon: () => <svg xmlns="http://www.w3.org/2000/svg" 
                width="25" height="23" fill="currentColor" strokeWidth="50" 
                className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" strokeWidth="50"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>,

    SquareIcon: () => <svg xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" 
            fill="#adb5bd" className="bi bi-square" 
            viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          </svg>,

    SquareCheckedIcon: () => <svg xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" style = {{background: "green"}}
            fill="" className="bi bi-check-square" 
            viewBox="0 0 16 16">
            <path fill ="green" 
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path fill = "white" 
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
          </svg>,
} 