import React from 'react';

export default class AdsGoogle extends React.Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className='adsbygoogle'
                style={{ display: 'block' }}
                data-ad-client='ca-pub-4731061272503094'
                // data-ad-slot='12121212'
                data-ad-format='auto' />
        );
    }
}