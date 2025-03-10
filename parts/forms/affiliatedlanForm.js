import { makeStyles } from '@material-ui/core/styles';
import { useCallback, useEffect, useState } from 'react';
import { Select, MultiSelectComponent } from '../../components/UIElements/InputField';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Alert from '@/components/UIElements/Alert';
import { formatAffiliateOptions, formatEthnicOptions } from '@/utils/utilities';
import { useRouter } from 'next/router';
import { fetchEthnic, createAffiliateLan, fetchAffiliatedLanguagebyId } from '@/store/actions/ethnicAction';
import { toggleIsLoading } from '@/store/actions/authActions';

const AffiliatedLanForm = () => {
    const classes = useStyles();
    const { handleSubmit, reset, setValue, control, register, errors, trigger } = useForm();
    const dispatch = useDispatch();
    const { user, msg } = useSelector(state => state.auth);
    const router = useRouter();
    const { ethnics, affiliate } = useSelector(state => state.Ethnics);
    const { isLoading } = useSelector(state => state.proverb);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const initialOption = [
        { label: 'Choose a Ethnic Language', value: ' ', disabled: true },
    ];
    const [triggeredSubmit, setTriggeredSubmit] = useState(false);

    useEffect(() => {
        if (!ethnics) {
            dispatch(fetchEthnic());
        }
        if (isLoading) {
            dispatch(toggleIsLoading());
        }
    }, []);

    useEffect(() => {
        // Fetch affiliated language data based on the selected language
        if (selectedLanguage) {
            dispatch(fetchAffiliatedLanguagebyId(selectedLanguage));

        }
    }, [selectedLanguage]);

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
        setValue('affiliateEthnics', []); // Reset affiliated language value
    };



    const onSubmit = async data => {

        setTriggeredSubmit(true);
        const { affiliateEthnics, ethnicId } = data;
        const extractedAffEthnicIds = affiliateEthnics.map(item => item.value);

        setValue('affiliateEthnics', extractedAffEthnicIds);

        const isValid = await trigger('affiliateEthnics');
        // Filter out preselected values
        const newSelectedValues = extractedAffEthnicIds.filter(
            id => !getPreselectedOptions(affiliate).some(item => {
                const preselectedValue = String(item.value);
                return preselectedValue === id || preselectedValue === id.replace(/-/g, '');
            })
        );
        

        if (isValid && newSelectedValues.length > 0) {
            const payload = {
                ethnicId,
                affiliateEthnics: newSelectedValues,
            };
            dispatch(createAffiliateLan(payload));
            // Clear the ethnics data to force refetch
            dispatch(fetchEthnic());
            // Reset the form and multi-select
            reset({
                ethnicId: '', // Reset the ethnicId field
                affiliateEthnics: [] // Reset the multi-select field
            });
        }
    };



    const getPreselectedOptions = (affiliate) => {
        return affiliate ? formatAffiliateOptions(affiliate) : [];
    };


    useEffect(() => {
        // Update the default value whenever the affiliate state changes
        if (affiliate) {
            const preselectedOptions = getPreselectedOptions(affiliate);
            setValue('affiliateEthnics', preselectedOptions, { shouldValidate: false });
            trigger('affiliateEthnics');
        }
       
    }, [affiliate]);

    useEffect(() => {
        return () => {
            dispatch({ type: 'RESET_AFFILIATE' });
        };
    }, []);




    return (
        <div className="card container mb-5">
            <ToastContainer position="top-center" />
            {msg ? <Alert payload={msg} /> : null}
            <div className="card-body">
                <h1 className="header-title display-1">Create Affiliated Language</h1>
                <p className="sub-header">Kindly Fill All Fields Correctly</p>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputState" className="col-form-label">
                                Ethnic Language
                            </label>
                            <Select
                                name="ethnicId"
                                ref={register({ required: true })}
                                onChange={(e) => {
                                    handleLanguageChange(e);
                                    setValue('affiliateEthnics', [], { shouldValidate: true });
                                }}
                            >
                                <option>Choose Ethnic Language</option>
                                {user &&
                                    user.ethnics.map((ethnic) => (
                                        <option key={ethnic.id} value={ethnic.id}>
                                            {ethnic.name}
                                        </option>
                                    ))}
                            </Select>
                            {errors.ethnicId && (
                                <span className={classes.error}>This Field is Required</span>
                            )}
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputState" className="col-form-label">
                                Affiliated Language
                            </label>
                            <Controller
                                control={control}
                                defaultValue={getPreselectedOptions(affiliate)}
                                name="affiliateEthnics"
                                shouldUnregister={false}
                                rules={{
                                    validate: (value) => {
                                        // Check if the form is submitted and the value is not selected
                                        return (triggeredSubmit && value.length === 0) ? 'Please select an ethnic language' : true;
                                    },
                                    required: true,
                                }}
                                render={({ onChange, onBlur, value }) => (
                                    <MultiSelectComponent
                                        options={
                                            ethnics ? formatEthnicOptions(ethnics) : initialOption
                                        }
                                        value={value || []}
                                        onChange={(aff) => onChange(aff)}
                                        labelledBy={'Please select an ethnic language'}
                                        name="affiliateEthnics"
                                        ref={register({ required: true })}
                                    />
                                )}

                            />

                            {errors.affiliateEthnics && (
                                <span className={classes.error}>
                                    {errors.affiliateEthnics.message}
                                </span>
                            )}
                        </div>

                        <div className="form-group col-md-12">
                            <button
                                type="submit"
                                className="btn col-md-12 btn-purple waves-effect waves-light mr-3"
                            >
                                <span>Create Affiliated Language</span>{' '}
                                <i className="fa fa-globe-africa ml-1"></i>{' '}
                            </button>
                        </div>
                        <br />
                    </div>

                </form>
                {msg ? <Alert key={new Date()} payload={msg} /> : null}
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    error: {
        color: 'red',
        fontSize: 11,
    },
}));

export default AffiliatedLanForm;
