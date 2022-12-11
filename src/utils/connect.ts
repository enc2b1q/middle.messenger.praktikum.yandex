import Block from "../services/block";
import store, {StoreEvents} from "../services/store";
import {Indexed} from "../services/types";
import isEqual from "./isEqual";

export default function connect(mapStateToProps: (state: Indexed) => Indexed) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props: any) {

                let state: Indexed = mapStateToProps(store.getState());

                super({...props, ...state});

                store.subscribe(StoreEvents.UPDATED, () => {
                    const newState: Indexed = mapStateToProps(store.getState());

                    if (!isEqual(state, newState)) {
                        this.setProps({...newState});
                    }

                    state = newState;
                });

            }
        }
    }

}
