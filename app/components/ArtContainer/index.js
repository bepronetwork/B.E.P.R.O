import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Img from 'components/Img';
import H3 from 'components/H3';

import Text from 'components/Text';
import Card from 'components/Card';

import { numberWithCommas } from '../../utils/numbers';

const TitleWrapperSold = styled.div`
    width: 350px;
    height: 540px;
    background: #FFFFFF;
`;

const TitleWrapperSelling = styled.div`
    width: 350px;
    height: 540px;
    background: #F5F5F5;
`;

const TitleWrapperNotAvailable = styled.div`
    width: 350px;
    height: 540px;
    background: white;
`;

const ContentWrapperBasic = styled.div`
    padding : 15px 25px;
`;

const ContentWrapperNotAvailable = styled.div`
    padding : 25px 25px;
`;

const SOLDwrapper = styled.div`
    padding : 5px;
    background-color : #9e9e9e;
    position : relative;
    float : right;
    margin-top : 0;
`;

const NOT_AVAILABLE_InfoWrapper  = styled.div`
    background-color : black;
    position : relative;
    padding : 25px;

`;

function ArtContainer({item}) {

    var Wrapper, ContentWrapper;
    switch(item.state){
        case 'SOLD' : {
            Wrapper = TitleWrapperSold;
            ContentWrapper = ContentWrapperBasic;
            break;
        };
        case 'SELLING' : {
            Wrapper = TitleWrapperSelling;
            ContentWrapper = ContentWrapperBasic;
            break;
        };
        case 'NOT_AVAILABLE' : {
            Wrapper = TitleWrapperNotAvailable;
            ContentWrapper = ContentWrapperNotAvailable;
            break;
        }
    }
    return (
        <Wrapper>
            <Card item={item}/>
            <ContentWrapper>
                <H3>#{item.id}</H3>
                {item.state == 'NOT_AVAILABLE' ? null : <H3 style={{color : "#6B6B6B", marginBottom : 0}}>{numberWithCommas(item.price)} $BEPRO</H3>}
                {item.state == 'SOLD' ? 
                    <SOLDwrapper>
                        <H3 style={{color : "white", marginBottom : 0, marginTop : 0}}>SOLD</H3>
                    </SOLDwrapper>
                : null}
                {item.state == 'NOT_AVAILABLE' ? 
                    null
                    :
                    <div>
                        <H3 style={{color : "#6B6B6B", marginBottom : 10, marginTop : 0}}>(~$2,345)</H3>
                        <Text style={{color : "#B8B8B8", marginTop : 0}}>List Price</Text>
                    </div>
                }
            </ContentWrapper>
            {item.state == 'NOT_AVAILABLE' ? 
                <NOT_AVAILABLE_InfoWrapper>
                    <Text data-tip="hello world" style={{color : "white", marginBottom : 0, marginTop : 0}}>// Available to Purchase after #{item.id-1}</Text>
                </NOT_AVAILABLE_InfoWrapper>
                : 
                null
            }
        </Wrapper>
    );
}

export default ArtContainer;
