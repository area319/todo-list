import {redirect, useRouter} from 'next/navigation'

export default function() {
    redirect('/login');
    return <></>;
}
