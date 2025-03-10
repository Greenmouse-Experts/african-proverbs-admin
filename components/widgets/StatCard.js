import { useRouter } from "next/router";
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { checkProverbAdmin } from '@/utils/utilities'

const StatCard = ({ name, icon, value, color, link }) => {
    const { user, msg } = useSelector(state => state.auth);

    return (
        <div class="card-box widget-user">
            <div class="media">
                <div class="avatar-lg mr-3">
                    {icon}
                </div>
                <div class="media-body overflow-hidden">
                    <h5 class="mt-0 mb-1">{name}</h5>
                    <div class="dropdown-divider"></div>
                    <big class={color}><b>{value}</b></big>
                    <div class="dropdown-divider"></div>
                    {(user?.user_type == "PROVERB_ADMIN" && name != "Family") ?
                        <Link href={link}>
                            <a>
                                <small class='text-dark'>{'View all >>'} </small>
                            </a>
                        </Link>
                        : null
                    }

                    {(user?.user_type == "FAMILY_TREE_ADMIN" && name == "Family") ?
                        <Link href={link}>
                            <a>
                                <small class='text-dark'>{'View all >>'} </small>
                            </a>
                        </Link>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default StatCard;