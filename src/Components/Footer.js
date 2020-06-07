import React from 'react';

function Footer(){
    return (<header className="bg-gray-200 text-center text-xs p-3 
            absolute bottom-0 w-full">
        <ul className = "flex justify-center">
            <li className = "text-base flex-no-wrap">   
                instagram: <a className = "text-blue-600" target = "_blank" 
                href="https://instagram.com/brandos_bites">brandos_bites</a>
            </li>
            <li className = "text-base flex-no-wrap mx-6">
                email me: <a className = "text-blue-600" href = "mailto:brandonzhang00@gmail.com">
                    brandonzhang00@gmail.com</a>
            </li>
            <li className = "text-base flex-no-wrap">
                github: <a className = "text-blue-600" href="https://github.com/bz22" target="_blank">
                github.com/bz22</a>
            </li>
        </ul>
        </header>
    )
}

export default Footer;