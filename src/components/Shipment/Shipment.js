import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log('Data submitted', data);
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
            {/* register your input into the hook by invoking the "register" function */}
            {/* <input defaultValue="" {...register("example")} /> */}

            {/* include validation with required or other standard HTML validation rules */}
            <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder={'Your name'} />
            {/* errors will return when field validation fails  */}
            {errors.name && <span>Name field is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder={'Your email'}  />
            {errors.email && <span>Email field is required</span>}

            <input {...register("address", { required: true })} placeholder={'Your address'}  />
            {errors.address && <span>Address field is required</span>}

            <input {...register("phone", { required: true })} placeholder={'Your phone'}  />
            {errors.phone && <span>Phone field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;