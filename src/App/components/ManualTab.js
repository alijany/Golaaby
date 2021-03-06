import DNS_Form from './DNS_Form';
import DNS_Row from './DNS_Row';

export class ManualTab extends React.Component {
    constructor(props) {
        super(props);

        this.DNS_List = props.DNS_Info.DNS_Info.DNS_List;
        this.fn = props.DNS_Info.fn;

        this.state = {
            form: false,
            rows: this.getRows()
        }

        this.addRow = this.addRow.bind(this);
        this.openAddDNS = this.openAddDNS.bind(this);
        this.closeForm = this.closeForm.bind(this);
    }

    getRows() {
        let DNS_List = Object.values(this.DNS_List);
        return DNS_List.map((DNS) => {
            let isEnable = this.props.DNS_Info.DNS_Info.EnableDNS == DNS.id;
            let key = `${DNS.id}-${DNS.latency}-${DNS.isEnable}`
            let action = isEnable ? this.fn.disconnect : this.fn.connect;
            return <DNS_Row DNS={DNS} key={key}
                en={isEnable}
                sync={() => this.syncRow(DNS.id)}
                action={() => action(DNS.id)}
                edit={() => this.openEditDNS(DNS)}
                rm={() => this.removeRow(DNS.id)} />
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.DNS_Info.HasUpdate != prevProps.DNS_Info.HasUpdate) {
            this.DNS_List = this.props.DNS_Info.DNS_Info.DNS_List;
            var newRow = this.getRows();
            this.setState({
                rows: newRow
            });
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {      
    // }

    openAddDNS() {
        this.setState({
            form: <DNS_Form title="افزودن" action={this.addRow} close={this.closeForm} />
        });
    }

    openEditDNS(DNS) {
        this.setState({
            form: <DNS_Form title="ویرایش"
                DNS1={DNS.DNS_servers[0]}
                DNS2={DNS.DNS_servers[1]}
                name={DNS.name}
                action={(newDNS) => this.editRow(DNS.id, newDNS)}
                close={this.closeForm} />
        });
    }

    closeForm() {
        this.setState({ form: null })
    }

    addRow(form) {
        var rows = this.state.rows;
        rows.push(<DNS_Row DNS={form} key={"temp" + form.name} />)
        this.setState({ form: false, rows: rows });
        this.fn.add(form);
    }

    syncRow(id) {
        this.fn.update(id);
    }

    editRow(id, DNS) {
        this.fn.edit(id, DNS);
        this.closeForm();
    }

    removeRow(id) {
        this.fn.remove(id);
    }

    render() {
        return (
            <div className={"tab-pane fade show active " + (this.props.isActive ? '' : "d-none")}>

                <div className="m-3 mt-5">
                    <div className="d-flex mb-3 justify-content-between align-items-center">
                        <button type="button" className="btn btn-primary mx-3 my-2 " onClick={this.openAddDNS}>افزودن</button>
                        <h6 className="mx-3 my-2 text-primary">ها DNS لیست</h6>
                    </div>

                    <table className="table mb-0 table-hover text-right text-dark">
                        <thead>
                            <tr className="te">
                                <td scope="col">گزینه ها</td>
                                <td scope="col">تاخیر</td>
                                <td scope="col">سرویس دهنده</td>
                            </tr>
                        </thead>
                        <tbody id='DNS-table'>
                            {this.state.rows}
                        </tbody>
                    </table>
                </div>

                {this.state.form}
            </div>
        );
    }
}

export default ManualTab;




