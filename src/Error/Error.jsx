import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="text-center">
            <h1 className="text-5xl">Oops!!!! There Is No Page With This Name</h1>
            {/* <button className="btn w-full mt-10 bg-[#23BE0A]"><Link to='/'>Go Home</Link></button> */}
            <Link to='/'><button className="btn w-full mt-10 bg-[#23BE0A]">Go Home</button></Link>
        </div>
    );
};

export default Error;