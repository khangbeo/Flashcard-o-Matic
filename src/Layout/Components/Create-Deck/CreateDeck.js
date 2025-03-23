import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createDeck } from "../../../utils/api";
import BreadCrumb from "../Shared/BreadCrumb";
import FormDeck from "../Shared/FormDeck";
import ReactLoading from "react-loading";
import "./CreateDeck.css";

export default function CreateDeck() {
    const navigate = useNavigate();
    const initialFormState = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setTimeout(() => setIsLoading(true), 500);
        return () => {
            controller.abort();
        };
    }, []);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck(
            { ...formData },
            abortController.signal
        );
        navigate(`/decks/${response.id}`);
        return response;
    };

    return (
        <div className="container py-4">
            {!isLoading ? (
                <div className="loading-container">
                    <ReactLoading
                        type={"spin"}
                        color={"#0d6efd"}
                        width={100}
                        height={100}
                    />
                </div>
            ) : (
                <>
                    <BreadCrumb name={"Create Deck"} />
                    <div className="create-deck-header mb-4">
                        <h2 className="h2 mb-2">Create New Deck</h2>
                        <p className="text-muted mb-0">
                            Add a new deck to your collection
                        </p>
                    </div>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <FormDeck
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                name={formData.name}
                                description={formData.description}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
