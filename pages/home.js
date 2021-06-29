import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList, TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';


export default function Home() {

    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [tempSearchValue, setTempSearchValue] = useState();
    const toggleModal = () => {

        setModalVisible(!isModalVisible);
    };
    const [list, setList] = useState([
        {name: 'Shopping', completed: false},
        {name: 'Go to gym', completed: true},
        {name: 'Meet a friend', completed: false}
    ])

    function changeState(index) {
        let temp = [...list];
        temp[index] = {...temp[index], completed: !temp[index].completed};

        setList(temp)

    }

    function createNewHandler() {
        if (name.length > 0) {
            setList(list => [{name: name, completed: false}, ...list])
            setModalVisible(!isModalVisible);
        }
    }

    function tempSearchHandler(text) {
        setTempSearchValue(text);
    }

    function searchHandler() {
        setSearchValue(tempSearchValue)


    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>To-Do Application</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.area}>

                    <View style={styles.searchArea}>
                        <TextInput style={styles.searchInput}
                                   placeholderTextColor='#DADFE1'
                                   placeholder='Search...'
                                   onChangeText={text => tempSearchHandler(text)}

                        />
                        <View style={styles.searchBTNArea}>
                            <TouchableOpacity onPress={searchHandler}>
                                <View>
                                    <Icon name="search" style={styles.searchBTN}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.listArea}>
                        <FlatList
                            data={list.filter(item => {
                                return item.name.includes(searchValue)
                            })}
                            renderItem={({item, index}) =>

                                <TouchableOpacity onPress={() => changeState(index)}>
                                    <View>
                                        <View style={[styles.item, (index === 0) ? {marginTop: 0} : '']} key={index}>
                                            <Text style={styles.textItem}>{item.name}</Text>
                                            {item.completed &&
                                            <View style={styles.checkArea}><Icon name="checkmark-outline"
                                                                                 style={styles.check}/></View>}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>

                    <View style={styles.addButtonArea}>
                        <TouchableOpacity onPress={toggleModal}>
                            <View>
                                <Icon name="add" style={styles.addBTN}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <Modal isVisible={isModalVisible} customBackdrop={
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={{flex: 1, backgroundColor: '#000'}}/>
                </TouchableWithoutFeedback>
            }>
                <View style={styles.modalFormArea}>
                    <Text style={styles.createTitle}>Create a new To-Do</Text>
                    <TextInput style={styles.titleInput} onChangeText={text => setName(text)}
                               placeholderTextColor='#b5b5b5'
                               placeholder='Name'
                    />
                    <View style={styles.addToDoArea}>
                        <TouchableOpacity onPress={createNewHandler}>
                            <View>
                                <Text style={styles.addToDoBTN}>Create</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#f1f3ff',

        color: '#5a55cb'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#5a55cb',
        color: '#fff'
    },
    body: {
        flex: 4,
        width: '100%',
        marginTop: -30
    },
    area: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        backgroundColor: '#f1f3ff',
        padding: 30,
        color: '#5a55cb',

    },
    title: {
        marginLeft: '10%',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },
    searchBTN: {
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f3f7ff',
        alignSelf: 'flex-start',
        borderRadius: 5,
        color: '#969eab'


    },
    searchInput: {
        fontSize: 15,
        borderWidth: 0,
        backgroundColor: '#fff',
        borderBottomWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingRight: 60,
        margin: 0,
        width: '100%'

    },
    searchBTNArea: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    listArea: {
        flex: 12,
        marginVertical: 20
    },
    addButtonArea: {
        flex: 1,
    },
    addBTN: {
        backgroundColor: '#5a55cb',
        borderRadius: 10,
        padding: 10,
        fontSize: 25,
        color: "#fff",
        textAlign: 'center'
    },
    addToDoBTN: {
        backgroundColor: '#5a55cb',
        borderRadius: 10,
        padding: 10,
        fontSize: 15,
        color: "#fff",
        textAlign: 'center'
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,

    },
    searchArea: {
        marginTop: 20
    },
    textItem: {
        fontWeight: 'bold',
        color: '#1c376a',
    },
    checkArea: {
        position: 'absolute',
        right: '5%',
        top: '90%'
    },
    check: {
        color: '#5a55cb',
        fontSize: 22,

    },
    modalFormArea: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff'
    },
    titleInput: {
        fontSize: 15,
        borderWidth: 0,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingRight: 60,
        margin: 0,
        width: '100%'
    },
    addToDoArea: {
        marginTop: 20,
    },
    createTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center'
    }
});
