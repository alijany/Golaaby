import DNS_Form from './components/DNS_Form';
import DNS_Row from './components/DNS_Row';

export class ManualTab extends React.Component {
    constructor(props) {
        super(props);
        // [DNS_Info, setDNS_Info, HasUpdate, setHasUpdate]
        this.DNS_Info = props.DNS_Info[0];

        this.state = {
            rows : Object.values(this.DNS_Info.DNS_List).map((DNS) => <DNS_Row DNS={DNS} key={DNS.id} />)
        }
    }

    render() {
        return (
            <div className={"tab-pane fade show active " + (this.props.isActive ? '' : "d-none")}>

                <div className="m-3 mt-5">
                    <div className="d-flex mb-3 justify-content-between align-items-center">
                        <button type="button" className="btn btn-primary mx-3 my-2 ">افزودن</button>
                        <h6 className="mx-3 my-2 text-primary">ها DNS لیست</h6>
                    </div>

                    <table className="table mb-0 table-hover text-right text-dark">
                        <thead>
                            <tr className="te">
                                <td scope="col">گذینه ها</td>
                                <td scope="col">تاخیر</td>
                                <td scope="col">سرویس دهنده</td>
                            </tr>
                        </thead>
                        <tbody id='DNS-table'>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>

                <DNS_Form title="تست" display={true} />
            </div>
        );
    }
}

export default ManualTab;




