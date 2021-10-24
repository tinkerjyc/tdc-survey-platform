import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { update } from '../../actions/auth';
import { logout } from '../../actions/auth';



const ProfileInfo = ({
                         user,
                         update
}) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role
    });



    const { name, email, role } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        console.log(user)
        e.preventDefault();
        update(user._id, email, role);
    };

    return (
        <>
            <div className="mr-3 background-color">
                <h1 className="mx-auto text-primary">My Profile Info</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2">
                            Username
                        </label>
                        <div className="col-sm-10">
                            <input type="text"
                                   readOnly
                                   className="form-control"
                                   value={user.name}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   type="email"
                                   name="email"
                                   value={email}
                                   onChange={onChange}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">
                            Role
                        </label>
                        <div className="col-sm-10">
                            <select className="form-control"
                                    name="role"
                                    value={role}
                                    onChange={onChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    {/*<div className="form-group row">*/}
                    {/*    <label className="col-sm-2 col-form-label">*/}
                    {/*    </label>*/}
                    {/*    <div className="col-sm-10">*/}
                    {/*        <a href="#"*/}
                    {/*           type="button"*/}
                    {/*           className="form-control btn btn-success"*/}
                    {/*           onClick={()=>addProfile(formData, history)}*/}
                    {/*        >*/}
                    {/*            Update*/}
                    {/*        </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <button onClick={logout} href="index"></button>
                    <input type="submit" value="update" className="btn btn-primary my-1" />
                </form>
            </div>
        </>
    )
}

ProfileInfo.propTypes = {
    update: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { update })(
    ProfileInfo
);



