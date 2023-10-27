import './error.scss';

const Error = () => {

    let curl1: string = '.{'
    let curl2: string = '}'


    return (
        <div className='error2'>
            <a href="https://codepen.io/ZonFire99/full/njdls/" className="viewFull" target="_parent">View in full it looks way better :)</a>

            <div className="error">

                <div className="wrap">
                    <div className="404">
                        <pre>
                            <code>
                                <span className="green">&lt;!</span><span>DOCTYPE html</span><span className="green">&gt;</span>
                                <span className="orange">&lt;html&gt;</span>
                                <span className="orange">&lt;style&gt;</span>
                                <span style={{ color : 'blue'}}>{curl1}</span>
                                <span className="green">everything</span>:<span className="blue">awesome</span>;
                                <span style={{color : 'blue'}}>{curl2}</span>
                                <span className="orange">&lt;/style&gt;</span>
                                <span className="orange">&lt;body&gt;</span>
                                ERROR 404! <br />
                                FILE NOT FOUND! <br />
                                <span className="comment">&lt;!--The file you are looking for,
                                    is not where you think it is.--&gt;
                                </span>
                                <span className="orange"></span>

                                <br />
                                <span className="info">
                                    <br />
                                    <span className="orange">&nbsp;&lt;/body&gt;</span>
                                    <br />
                                    <span className="orange">&lt;/html&gt;</span>
                                </span>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error;