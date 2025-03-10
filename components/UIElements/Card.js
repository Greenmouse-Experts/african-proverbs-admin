import PropTypes from 'prop-types';


const Card = ({ title, body, time, children }) => {

    return (
        <div class="card card-body">
            <h4 class="card-title">{title}</h4>
            <p class="card-text">{body}</p>
            <p class="card-text">
             <small class="text-muted">{time}</small>
                <ul class="list-inline mt-1">
                    {children}

                </ul>
            </p>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default Card;