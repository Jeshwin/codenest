template <class Item>
class bag_iterator{
    Item *container;
    site_t used;
    size_t position;
    public:
        bag_iterator(Item *container, size_t position, size_t used){
            this->container = container;
            this->position = position;
            this->used = used;
        }
        bool operator ==(bag_iterator &b2){
            return position == b2.position && container == b2.container && used == b2.used;
        }
        Item operator*(){
            assert(position < used);
            return container[position];
        }
        //Prefix operator
        //++i// modify i and then return the new value
        bag_iterator &operator++(){
            position ++;
            return *this;
        }
};