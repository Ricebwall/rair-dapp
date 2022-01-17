import React from 'react'
import TeammateDesc from './TeammateDesc';

const Teammate = ({ url, name, desc, primaryColor, socials }) => {
    return (
        <div className="box-teammate">
            <div className="img-teammate">
                <img src={url} alt="teamate-img" />
            </div>
            <div className="position-teammate">
                <div className="temmate-content-up">
                    <div className="teammate-title-socials">
                        <div>
                            <h4>{name}</h4>
                        </div>
                        <div className="box-socials">
                            {
                                socials && socials.map((social, index) => {
                                    return <span key={social + index}>
                                        <a className={social.classLink} target="_blank" href={social.link} rel="noreferrer">
                                            <i className={social.classIcon}></i>
                                        </a>
                                    </span>
                                })
                            }

                        </div>
                    </div>
                    <TeammateDesc desc={desc} primaryColor={primaryColor} />
                </div>
            </div>
        </div>
    )
}

export default Teammate
