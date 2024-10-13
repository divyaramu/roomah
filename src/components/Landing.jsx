import React from 'react';
import { Link } from 'react-router-dom';
import homebg from '../images/homebg.png';

// Navigation Component
const Navigation = () => {
    const navItems = ['PROPERTIES', 'INSPECTION', 'ABOUT US'];
  
    return (
      <nav className="flex gap-5 text-center mt-0">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={`/${item.toLowerCase().replace(/\s/g, '-')}`}
            className="text-white no-underline hover:underline hover:underline-offset-4 transition duration-300"
          >
            {item}
          </Link>
        ))}
      </nav>
    );
  };
  

// Header Component
// const Header = () => {
//   return (
//     <header className="flex overflow-hidden flex-wrap gap-10 pl-52 text-lg font-light text-center bg-slate-900 text-zinc-100 max-md:px-5 relative">
//       <div className="flex relative flex-col items-center px-16 pb-60 ml-16 max-w-[1027px] min-h-[773px] pt-[726px] max-md:px-5 max-md:py-24 max-md:max-w-full max-sm:ml-px max-sm:max-w-[350px]">
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9c65480c1dd605f888c1aeeda24f03e3cb1bf895c7ff7921b60c718f61bc530?placeholderIfAbsent=true&apiKey=e9d05e023b1f48188dc40737b45bf129"
//           alt=""
//           className="object-cover absolute inset-0 w-full h-full"
//         />
//         <Navigation />
//       </div>
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ef363595fa10f92fbd6d7e2b804b83b1947f0f2dc04427ebd353f54a327b23b?placeholderIfAbsent=true&apiKey=e9d05e023b1f48188dc40737b45bf129"
//         alt="User Icon"
//         className="object-contain shrink-0 self-start mt-10 mr-6 ml-11 aspect-[1.03] w-[38px]"
//       />
//     </header>
//   );
// };

// // App Component (Landing Page)
// const LandingPage = () => {
//   return (
//     <main
//       className="relative"
//       style={{
//         backgroundImage: 'url(https://your-background-image-url)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         minHeight: '100vh'
//       }}
//     >
//       <Header />
//       <style jsx>{`
//         builder-component {
//           max-width: none !important;
//         }
//       `}</style>
//     </main>
//   );
// };

// const Header = () => {
//     return (
//       <header className="relative flex flex-col items-center justify-center h-screen">
//         {/* Sign Up Link */}
//         <div className="absolute top-5 right-0">
//           <Link
//             to="/register"
//             className="text-white hover:underline transition duration-300 text-lg"
//           >
//             Sign Up
//           </Link>
//         </div>
  
//         {/* Larger Logo */}
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9c65480c1dd605f888c1aeeda24f03e3cb1bf895c7ff7921b60c718f61bc530?placeholderIfAbsent=true&apiKey=e9d05e023b1f48188dc40737b45bf129"
//           alt="Roomah Logo"
//           className="object-contain w-[800px] mb-0"  
//         />
  
//         {/* Navigation Links */}
//         <Navigation />
//       </header>
//     );
//   };


const Header = () => {
    return (
      <header className="relative flex flex-col items-center justify-center h-screen">
        {/* Sign Up Link */}
        <div className="absolute top-5 right-5">
          <Link
            to="/register"
            className="text-white hover:underline transition duration-300 text-lg"
          >
            Sign Up
          </Link>
        </div>
  
        {/* Larger Logo */}
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9c65480c1dd605f888c1aeeda24f03e3cb1bf895c7ff7921b60c718f61bc530?placeholderIfAbsent=true&apiKey=e9d05e023b1f48188dc40737b45bf129"
          alt="Roomah Logo"
          className="object-contain w-[800px] mb-10"
        />
  
        {/* Navigation Links */}
        <Navigation />
      </header>
    );
  };

  
  
  // Landing Page Component
//   const LandingPage = () => {
//     return (
//       <main
//         className="bg-slate-900 text-white h-screen w-screen flex items-center justify-center"
//         style={{
//           overflow: 'hidden',
//         }}
//       >
//         <img src={homebg} alt="Background" className="absolute inset-0 z-0 w-full h-full object-cover" /> 
        
//         <Header />
//       </main>
//     );
//   };  

  const LandingPage = () => {
    return (
      <main
        className="relative bg-slate-900 text-white h-screen w-screen flex items-center justify-center"
        style={{
          overflow: 'hidden',
        }}
      >
        <img src={homebg} alt="Background" className="absolute inset-0 z-0 w-full h-full object-cover" /> 
  
        <Header />
      </main>
    );
  };
  

export default LandingPage;