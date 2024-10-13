import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // return (
  //   <header className="flex flex-wrap gap-5 justify-between items-start pr-7 w-full text-lg font-light text-center bg-slate-900 text-zinc-100 max-md:pr-5 max-md:max-w-full">
  //     <Link to="/">
  //       <img
  //         loading="lazy"
  //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/97d0f83d070dac0d1137d41acb61a4f1d081625c15f93853dc412f63b091fe05?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
  //         alt="Roomah Logo"
  //         className="object-contain shrink-0 self-start max-w-full aspect-[1.23] w-[133px] hover:opacity-80 transition duration-300"
  //       />
  //     </Link>
      
  //     <nav className="flex flex-wrap gap-10 items-center my-auto max-md:max-w-full">
  //       <Link to="properties" className="self-stretch my-auto basis-auto">
  //         PROPERTIES
  //       </Link>
  //       <Link to="/inspection" className="self-stretch my-auto basis-auto">
  //         INSPECTION
  //       </Link>
  //       <Link to="/about" className="self-stretch my-auto basis-auto">
  //         ABOUT US
  //       </Link>
          
  //       <Link to="/login">  
  //         <img
  //           loading="lazy"
  //           src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fccf5ca8daf01499564bf03498beb14438f9d76605a29baa86f263cae5a7685?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
  //           alt="User Icon"
  //           className="object-contain shrink-0 self-stretch aspect-[1.03] w-[38px] hover:opacity-80 transition duration-300"
  //         />
  //       </Link>
  //     </nav>
  //   </header>
  // );


  return (
    <header className="flex flex-wrap gap-5 justify-between items-start pr-7 w-full text-lg font-light text-center bg-slate-900 text-zinc-100 max-md:pr-5 max-md:max-w-full">
      <Link to="/">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/97d0f83d070dac0d1137d41acb61a4f1d081625c15f93853dc412f63b091fe05?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
          alt="Roomah Logo"
          className="object-contain shrink-0 self-start max-w-full aspect-[1.23] w-[133px] hover:opacity-80 transition duration-300"
        />
      </Link>
      
      <nav className="flex flex-wrap gap-10 items-center my-auto max-md:max-w-full">
        <Link 
          to="properties" 
          className="self-stretch my-auto basis-auto text-white no-underline hover:underline transition duration-300"
        >
          PROPERTIES
        </Link>
        <Link 
          to="/inspection" 
          className="self-stretch my-auto basis-auto text-white no-underline hover:underline transition duration-300"
        >
          INSPECTION
        </Link>
        <Link 
          to="/about" 
          className="self-stretch my-auto basis-auto text-white no-underline hover:underline transition duration-300"
        >
          ABOUT US
        </Link>
          
        <Link to="/login">  
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0fccf5ca8daf01499564bf03498beb14438f9d76605a29baa86f263cae5a7685?placeholderIfAbsent=true&apiKey=acb5ad1f9f104b1a87901337d5409b56"
            alt="User Icon"
            className="object-contain shrink-0 self-stretch aspect-[1.03] w-[38px] hover:opacity-80 transition duration-300"
          />
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
