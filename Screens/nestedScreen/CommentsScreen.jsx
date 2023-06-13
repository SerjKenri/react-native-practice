import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommentsScreen = ({ route }) => {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    console.log(allComments);

    useEffect(() => {
        if (route.params) {
            setPosts(prevState => [...prevState, route.params]);
        }
    }, [route.params]);

    const addComment = () => {
        setAllComments(prevState => [...prevState, { comment: comment }]);
        setComment('');
    };

    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: posts[0].photo }} style={styles.image} />
            </View>
            <SafeAreaView style={styles.commentsContainer}>
                <FlatList
                    data={allComments}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <Text>User</Text>
                            <Text style={styles.comment}>{item.comment}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
            <View style={styles.inputContainer}>
                <View style={styles.inputField}>
                    <TextInput
                        placeholder="Коментувати..."
                        style={styles.input}
                        onChangeText={setComment}
                        value={comment}
                    />
                </View>
                <TouchableOpacity onPress={addComment} style={styles.sendBtn}>
                    <Ionicons
                        name="arrow-up-circle"
                        size={34}
                        color="#FF6C00"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    commentsContainer: {
        flex: 1,
    },
    commentContainer: {
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        width: '100%',
        marginBottom: 24,
    },
    comment: { color: '#212121', fontSize: 13, fontFamily: 'Roboto-Regular' },
    sendBtn: {
        borderRadius: 50,
        position: 'absolute',
        top: 0,
        left: '100%',
        transform: [{ translateX: -42 }, { translateY: 8 }],
    },
    sendLabel: {
        color: '#20b2aa',
        fontSize: 20,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 16,
        marginTop: 31,
    },
    input: {
        height: 50,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 100,
        padding: 16,
        color: '#212121',
        placeholderTextColor: '#BDBDBD',
    },
    image: {
        width: '100%',
        marginTop: 32,
        marginBottom: 32,
        height: 240,
        borderRadius: 8,
    },
});
