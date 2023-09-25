import { Component } from 'preact';
import { Accordion } from '@mantine/core';
import { getFAQ_Memory } from './FAQ';
import appConfig from '../../../../config/appConfig';

class NextPage extends Component {
    state = {
        data: [],
        category: '',
    };



    async componentDidMount() {
        console.log(this.props);
        const memory = await getFAQ_Memory();
        const data = memory?.filter(item => Object.values(item.categoriesNames)[0] === this.props.id);

        

        for (let item of data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(item.body, "text/html");
            const imgElements = doc.getElementsByTagName("img");
            for (let i = 0; i < imgElements.length; i++) {
                let img = imgElements[i];
                let imgSrc = img.getAttribute("src");
                let absoluteURL = `${appConfig.backendUrl}/faqs/attachment${imgSrc}&auth=d2lmaS10ZXN0MUBybHAuZGV2LXR1di5kZTpXaWZpLVRlc3Qx`;
                img.setAttribute("src", absoluteURL);
            }
            item.body = doc.body.innerHTML;
        }
        this.setState({ data });
    }



    render({ }, { data, category }) {
        return (
            <div className="p-4 overflow-x-auto">
                <h1 className="text-xl mb-4">{category}</h1>
                <Accordion variant="separated" radius="lg" chevronPosition="left"
                defaultValue={this.props.q}
                >
                    {data.map((item, index) => {
                        // if props.q is not null and is equal to the current item id, then scroll to that item
                        if(this.props.q && this.props.q === item.id) {
                            setTimeout(() => {
                                const el = document.getElementById(item.id);
                                el.scrollIntoView({ behavior: 'smooth' });
                            }, 500);
                        }
                        return(
                        <Accordion.Item id={item.id} value={item.id} key={index}>
                            <Accordion.Control>{item.name}</Accordion.Control>
                            <Accordion.Panel><div id={item.id} dangerouslySetInnerHTML={{ __html: item.body }} /></Accordion.Panel>
                        </Accordion.Item>



                    )})}
                </Accordion>
            </div>
        );
    }
}

export default NextPage;